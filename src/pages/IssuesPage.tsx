import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitHub } from '../contexts/GitHubContext';
import IssueList from '../components/IssueList';

const IssuesPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const { repository, loading, error, fetchRepository, fetchIssues } = useGitHub();
  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    if (owner && repo) {
      fetchRepository(owner, repo);
      // 不再自动获取 issues
    }
  }, [owner, repo, fetchRepository]);

  const handleViewIssues = () => {
    if (owner && repo) {
      fetchIssues(owner, repo);
      setShowIssues(true);
    }
  };

  if (loading && !repository) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !repository) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">错误！</strong>
        <span className="block sm:inline"> {error}</span>
        <Link to="/" className="block mt-4 text-blue-600 hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回首页
        </Link>
      </div>

      {repository && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{repository.full_name}</h1>
              {repository.description && (
                <p className="text-gray-600 mt-2">{repository.description}</p>
              )}
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {repository.stargazers_count} 星标
                </span>
                <span className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {repository.forks_count} 分支
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {repository.open_issues_count} 个开放的 issues
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <a 
                href={`https://github.com/${owner}/${repo}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                在 GitHub 上查看
              </a>
              {!showIssues && (
                <button
                  onClick={handleViewIssues}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  查看 Issues
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showIssues && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Issues 列表</h2>
          {owner && repo && <IssueList owner={owner} repo={repo} />}
        </div>
      )}
    </div>
  );
};

export default IssuesPage; 