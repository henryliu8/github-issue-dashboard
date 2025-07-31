import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGitHub } from '../contexts/GitHubContext';
import ReactMarkdown from 'react-markdown';

const IssueDetailPage: React.FC = () => {
  const { owner, repo, issueNumber } = useParams<{ owner: string; repo: string; issueNumber: string }>();
  const { currentIssue, loading, error, fetchIssue } = useGitHub();

  useEffect(() => {
    if (owner && repo && issueNumber) {
      fetchIssue(owner, repo, parseInt(issueNumber));
    }
  }, [owner, repo, issueNumber, fetchIssue]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !currentIssue) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !currentIssue) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">错误！</strong>
        <span className="block sm:inline"> {error}</span>
        <Link to={`/issues/${owner}/${repo}`} className="block mt-4 text-blue-600 hover:underline">返回 Issues 列表</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/issues/${owner}/${repo}`} className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回 Issues 列表
        </Link>
      </div>

      {currentIssue && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{currentIssue.title}</h1>
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentIssue.state === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {currentIssue.state === 'open' ? '开启' : '关闭'}
                </span>
                <span className="ml-2">
                  #{currentIssue.number} 创建于 {formatDate(currentIssue.created_at)}
                </span>
              </div>
            </div>
            <a 
              href={`https://github.com/${owner}/${repo}/issues/${issueNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
            >
              在 GitHub 上查看
            </a>
          </div>

          <div className="border-t pt-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="prose max-w-none">
                <ReactMarkdown>{currentIssue.body}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailPage; 