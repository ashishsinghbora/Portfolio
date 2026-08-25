import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repoPath = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
  // Only add basePath if not a user page (i.e. not username.github.io)
  if (repoName && !repoName.endsWith('.github.io')) {
    repoPath = `/${repoName}`;
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repoPath || undefined,
  assetPrefix: repoPath ? `${repoPath}/` : undefined,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
