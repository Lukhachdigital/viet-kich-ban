import React from 'react';

interface IdeaInputProps {
  idea: string;
  setIdea: (idea: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  style: string;
  setStyle: (style: string) => void;
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const styles = ['Điện ảnh', 'Tài liệu', 'Khoa học viễn tưởng', 'Cổ điển', 'Hoạt hình Anime', 'Siêu thực'];

export const IdeaInput: React.FC<IdeaInputProps> = ({
  idea,
  setIdea,
  duration,
  setDuration,
  style,
  setStyle,
  apiKey,
  setApiKey,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6 border border-gray-700">
       <div>
        {apiKey ? (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">OpenAI API Key</label>
            <div className="flex items-center justify-between bg-gray-900/50 border border-green-700 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-400">API Key is set.</span>
              </div>
              <button onClick={() => setApiKey('')} className="text-indigo-400 hover:underline text-sm font-semibold">
                Change Key
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="api-key"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Nhập API Key OpenAI của bạn tại đây"
              autoComplete="off"
            />
            <p className="mt-2 text-xs text-gray-500">
              Bạn có thể lấy API Key tại{' '}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                OpenAI Platform
              </a>.
            </p>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-gray-300 mb-2">
          Ý tưởng chính
        </label>
        <textarea
          id="idea"
          rows={4}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Ví dụ: Điều gì sẽ xảy ra nếu khủng long không bao giờ tuyệt chủng?"
        />
        <p className="mt-2 text-xs text-gray-500">Gợi ý: Viết kịch bản kiểu giả thuyết, luôn đặt câu hỏi và trả lời theo giả thuyết.</p>
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
          Thời lượng Video (phút)
        </label>
        <input
          type="number"
          id="duration"
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          value={duration}
          onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          step="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phong cách
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {styles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
                ${style === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !idea || !apiKey}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang xử lý...
          </>
        ) : (
          'Tạo kịch bản'
        )}
      </button>
    </div>
  );
};