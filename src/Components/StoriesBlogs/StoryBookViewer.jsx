
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PageCover = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="page-content bg-white shadow-sm border-l border-gray-100 h-full overflow-hidden" data-density="soft">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
         {props.children}
         {/* Inner shadow for book feel */}
         <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-400/20 to-transparent pointer-events-none" />
         <div className="absolute bottom-4 right-4 text-xs text-gray-400">{props.number}</div>
      </div>
    </div>
  );
});

const StoryBookViewer = ({ pdfUrl, title, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currPage, setCurrPage] = useState(0); 
  const [bookRatio, setBookRatio] = useState(1.414); // Default to A4, will update
  const flipBookRef = useRef(null);
  
  const [dimensions, setDimensions] = useState({ width: 400, height: 570 }); 
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      let width, height;
      
      // Check for high zoom levels (approx 175%+)
      setShouldScroll(window.devicePixelRatio >= 1.74);

      if (isFullScreen) {
          // Calculate available space
          // Buffer for header/margins. 
          const availHeight = window.innerHeight - 80; 
          const availWidth = window.innerWidth - 40; 
          
          const maxPageHeight = availHeight;
          const maxPageWidth = availWidth / 2;

          // Maximize height first
          height = maxPageHeight;
          
          // User Request: "increase the width more only width"
          // We intentionally stretch the width by 25% beyond the aspect ratio
          width = (height / bookRatio) * 1.25;

          // Cap at screen width
          if (width > maxPageWidth) {
              width = maxPageWidth;
              // We do NOT reduce height here, allowing the book to fill the screen 
              // even if it means further distortion, as per user request.
          }

      } else {
          // Normal mode
          width = window.innerWidth < 768 ? window.innerWidth - 40 : 400;
          height = width * bookRatio;
      }
      
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullScreen, bookRatio]); // Add bookRatio dependency

    // Lock body scroll
    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isFullScreen]);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrPage(0);
  }

  // Capture dimensions from the first page (Cover)
  function onPageLoadSuccess(page) {
      if (page.originalWidth && page.originalHeight) {
          const ratio = page.originalHeight / page.originalWidth;
          if (Math.abs(ratio - bookRatio) > 0.05) {
             setBookRatio(ratio);
          }
      }
  }

  const onFlip = (e) => {
      setCurrPage(e.data);
  }

  const nextFlip = () => {
     flipBookRef.current?.pageFlip()?.flipNext();
  };

  const prevFlip = () => {
     flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const isStart = currPage === 0;
  const isEnd = numPages && currPage >= numPages - 1;

  return (
    <div className={`
      flex flex-col items-center rounded-xl transition-all duration-300
      ${isFullScreen 
          ? `fixed inset-0 z-50 p-0 bg-gray-900 ${shouldScroll ? 'overflow-y-auto' : 'overflow-hidden justify-center'}` 
          : 'relative w-full p-4 border border-white/20 shadow-xl bg-kelloggs-red overflow-hidden'
      }
    `}>
      
      {/* Decorative Blobs for depth (Only in normal view) */}
      {!isFullScreen && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-kelloggs-gold opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        </>
      )}

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 px-4 flex-shrink-0 relative z-20 text-white">
         <div className="font-bold text-lg truncate flex-1 text-left">{title || 'Story Book'}</div>
         <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
               <Maximize2 size={20} />
            </button>
             {isFullScreen && (
                <button onClick={() => setIsFullScreen(false)} className="text-white hover:bg-white/20 rounded-full p-2">
                    <X size={20} />
                </button>
             )}
         </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full flex items-center justify-center relative ${shouldScroll ? 'my-auto' : ''}`}>
        
         {/* Navigation Buttons */}
         <button 
             onClick={prevFlip}
             disabled={isStart}
             className={`
                absolute left-0 md:left-4 z-20 p-3 rounded-full shadow-lg transition-all
                ${isStart ? 'opacity-30 cursor-not-allowed bg-gray-300' : 'bg-white/90 hover:bg-kelloggs-gold hover:text-white text-gray-800 hover:scale-110'}
             `}
         >
             <ChevronLeft size={24} />
         </button>

         <button 
             onClick={nextFlip}
             disabled={isEnd}
             className={`
                absolute right-0 md:right-4 z-20 p-3 rounded-full shadow-lg transition-all
                ${isEnd ? 'opacity-30 cursor-not-allowed bg-gray-300' : 'bg-white/90 hover:bg-kelloggs-gold hover:text-white text-gray-800 hover:scale-110'}
             `}
         >
             <ChevronRight size={24} />
         </button>


        <div className={`relative shadow-2xl ${isFullScreen ? 'flex items-center justify-center h-full' : 'my-4'}`}>
             <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="text-white animate-pulse">Loading Book...</div>}
                className="flex justify-center items-center"
             >
                {numPages && (
                    <HTMLFlipBook 
                        key={`${isFullScreen ? 'fullscreen' : 'normal'}-${bookRatio}`}
                        width={Math.floor(dimensions.width)}
                        height={Math.floor(dimensions.height)}
                        size="fixed"
                        minWidth={100}
                        maxWidth={3000}
                        minHeight={100}
                        maxHeight={3000}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        onFlip={onFlip}
                        ref={flipBookRef}
                        className="shadow-2xl"
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <PageCover key={`page_${index + 1}`} number={index + 1}>
                                <ReactPdfPage 
                                    pageNumber={index + 1} 
                                    width={Math.floor(dimensions.width)}
                                    height={Math.floor(dimensions.height)}
                                    // Height is inferred from width + aspect ratio.
                                    onLoadSuccess={index === 0 ? onPageLoadSuccess : undefined}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="h-full w-full flex items-center justify-center [&_canvas]:!h-full [&_canvas]:!w-full"
                                />
                            </PageCover>
                        ))}
                    </HTMLFlipBook>
                )}
             </Document>
        </div>
      </div>
    </div>
  );
};

export default StoryBookViewer;
