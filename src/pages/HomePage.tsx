import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGitHub } from '../contexts/GitHubContext';

const HomePage: React.FC = () => {
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchResults, totalResults, loading, error, searchRepos } = useGitHub();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchRepos(searchQuery);
    }
  };

  const handleViewIssues = (repoFullName: string) => {
    const [repoOwner, repoName] = repoFullName.split('/');
    navigate(`/issues/${repoOwner}/${repoName}`);
  };

  const handleDirectAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (owner && repo) {
      navigate(`/issues/${owner}/${repo}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">GitHub Issue Dashboard</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">直接访问仓库</h2>
          <form onSubmit={handleDirectAccess} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="仓库所有者 (例如: facebook)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="仓库名称 (例如: react)"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看 Issues
            </button>
          </form>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">搜索仓库</h2>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="输入关键词搜索仓库 (例如: react state management)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? '搜索中...' : '搜索'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">错误！</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {searchResults.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-4">找到 {totalResults} 个结果</p>
              <div className="space-y-4">
                {searchResults.map((repo) => (
                  <div key={repo.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{repo.full_name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{repo.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="flex items-center mr-4">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center mr-4">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                            {repo.forks_count}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            {repo.open_issues_count} 个开放的 issues
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewIssues(repo.full_name)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                      >
                        查看 Issues
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 