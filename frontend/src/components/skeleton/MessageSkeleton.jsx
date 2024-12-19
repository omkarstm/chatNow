const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start flex flex-col gap-2" : "flex flex-col items-end gap-2 justify-end"}`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <div className="bg-gray-300 w-full h-full rounded-full" />
              </div>
            </div>
  
            <div className="chat-header mb-1">
              <div className="bg-gray-300 h-4 w-16 rounded" />
            </div>
  
            <div className="chat-bubble bg-transparent p-0 rounded">
              <div className="bg-gray-300 h-16 w-[200px] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;