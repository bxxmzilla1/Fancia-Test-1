
import React, { useState, useCallback } from 'react';
import { PhotoIcon, DocumentTextIcon } from '../components/icons/Icons';

const Upload: React.FC = () => {
  const [uploadType, setUploadType] = useState<'media' | 'text'>('media');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isPPV, setIsPPV] = useState(false);
  const [price, setPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files && event.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the upload logic here
    console.log({
      type: uploadType,
      file: uploadType === 'media' ? file : null,
      caption: caption,
      content: uploadType === 'text' ? textContent : null,
      isPPV: isPPV,
      price: isPPV ? price : null,
    });
    
    // Reset form
    setFile(null);
    setPreview(null);
    setCaption('');
    setTextContent('');
    setIsPPV(false);
    setPrice('');
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Upload Content</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-6 space-y-6">
        {/* Upload Type Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            type="button"
            onClick={() => setUploadType('media')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              uploadType === 'media' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Media
          </button>
          <button
            type="button"
            onClick={() => setUploadType('text')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              uploadType === 'text' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Text
          </button>
        </div>

        {/* Media Uploader */}
        {uploadType === 'media' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload a file</label>
            <div 
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(e.target.files && e.target.files[0])}
                accept="image/*,video/*"
              />
              {preview ? (
                <div className="relative">
                  {file?.type.startsWith('image') ? (
                    <img src={preview} alt="Preview" className="mx-auto max-h-60 rounded-lg" />
                  ) : (
                    <video src={preview} controls className="mx-auto max-h-60 rounded-lg" />
                  )}
                  <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-2 py-0.5 text-lg leading-none">&times;</button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <PhotoIcon className="w-12 h-12 mb-2" />
                  <p className="font-semibold">Drag & drop your file here</p>
                  <p className="text-sm">or click to browse</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Uploader */}
        {uploadType === 'text' && (
          <div>
            <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Write your post
            </label>
            <textarea
              id="textContent"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={6}
              placeholder="What's on your mind?"
              className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
              required
            />
          </div>
        )}

        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Caption (optional)
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder="Add a caption..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
          />
        </div>

        {/* PPV Toggle */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Pay-Per-View Content</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Set a price for this post</p>
                </div>
                <label htmlFor="ppv-toggle" className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" checked={isPPV} onChange={() => setIsPPV(!isPPV)} id="ppv-toggle" className="sr-only peer"/>
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
            </div>
            {isPPV && (
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price ($)
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0.01"
                            step="0.01"
                            placeholder="5.00"
                            className="w-full pl-7 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-primary-500 focus:border-primary-500 transition"
                            required
                        />
                    </div>
                </div>
            )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
            disabled={ (uploadType === 'media' && !file) || (uploadType === 'text' && !textContent.trim()) }
          >
            Post Now
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
            <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
                Content posted successfully!
            </div>
        )}
      </form>
    </div>
  );
};

export default Upload;
