import React from 'react';
import { Link } from 'react-router-dom';
import { Issue } from '../services/githubService';

interface IssueItemProps {
  issue: Issue;
  repoOwner: string;
  repoName: string;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue, repoOwner, repoName }) => {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link 
            to={`/issues/${repoOwner}/${repoName}/${issue.number}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {issue.title}
          </Link>
          
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              issue.state === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {issue.state === 'open' ? '开启' : '关闭'}
            </span>
            
            <span className="ml-2">
              #{issue.number} 由 
              <a 
                href={`https://github.com/${issue.user.login}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                {issue.user.login}
              </a> 
              创建于 {formatDate(issue.created_at)}
            </span>
          </div>
          
          {issue.labels.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {issue.labels.map(label => (
                <span 
                  key={label.id}
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `#${label.color}25`, 
                    color: `#${label.color}` 
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500 whitespace-nowrap">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            {issue.comments}
          </div>
          <div className="text-xs mt-1">
            更新于 {formatDate(issue.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;