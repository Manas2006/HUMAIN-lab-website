/**
 * GitHub API utility for Git-based content storage
 * Commits changes directly to the repository
 */

const GITHUB_API = 'https://api.github.com'

interface GitHubFile {
  path: string
  content: string
  message: string
}

interface GitHubFileResponse {
  sha: string
  content: string
}

/**
 * Get the current SHA of a file (needed for updates)
 */
async function getFileSha(path: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.')
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (response.status === 404) {
      return null // File doesn't exist
    }

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`)
    }

    const data: GitHubFileResponse = await response.json()
    return data.sha
  } catch (error) {
    console.error('Error getting file SHA:', error)
    return null
  }
}

/**
 * Create or update a file in the repository
 */
export async function commitFile({ path, content, message }: GitHubFile): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.')
  }

  try {
    // Get current SHA if file exists
    const sha = await getFileSha(path)

    // Encode content to base64
    const encodedContent = Buffer.from(content).toString('base64')

    const body: Record<string, string> = {
      message,
      content: encodedContent,
      branch,
    }

    // Include SHA if updating existing file
    if (sha) {
      body.sha = sha
    }

    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('GitHub API error:', error)
      throw new Error(`Failed to commit file: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Error committing file:', error)
    throw error
  }
}

/**
 * Delete a file from the repository
 */
export async function deleteFile(path: string, message: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.')
  }

  try {
    // Get current SHA
    const sha = await getFileSha(path)

    if (!sha) {
      throw new Error('File not found')
    }

    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sha,
          branch,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('GitHub API error:', error)
      throw new Error(`Failed to delete file: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

/**
 * Check if GitHub is configured
 */
export function isGitHubConfigured(): boolean {
  return !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO)
}

/**
 * Get file content from the repository
 */
export async function getFileContent(path: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  // Return null if GitHub is not configured (will fall back to local files)
  if (!token || !owner || !repo) {
    return null
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`)
    }

    const data: GitHubFileResponse = await response.json()
    return Buffer.from(data.content, 'base64').toString('utf-8')
  } catch (error) {
    console.error('Error getting file content:', error)
    return null
  }
}

