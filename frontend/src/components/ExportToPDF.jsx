const ExportToPDF = ({ entries }) => {
    const componentRef = useRef();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
  
    const handlePrint = useReactToPrint({
      content: () => {
        // Verify content before printing
        if (!componentRef.current || !entries?.length) {
          setError('No valid content to export');
          return null;
        }
        return componentRef.current;
      },
      onBeforeGetContent: () => {
        console.log('Starting PDF generation with entries:', entries);
        setIsGenerating(true);
        setError(null);
      },
      onAfterPrint: () => {
        console.log('PDF generation completed');
        setIsGenerating(false);
      },
      onPrintError: (err) => {
        console.error('PDF generation failed:', err);
        setError(`PDF generation failed: ${err.message}`);
        setIsGenerating(false);
      }
    });
  
    // Debugging helper
    useEffect(() => {
      console.log('Current entries for PDF:', entries);
    }, [entries]);
  
    if (!entries || entries.length === 0) {
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p>No entries available to export</p>
          <p className="text-sm text-yellow-700 mt-1">
            Save some mood entries first
          </p>
        </div>
      );
    }
  
    return (
      <div className="mt-6">
        <button
          onClick={() => {
            console.log('Export button clicked');
            handlePrint();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FaFilePdf className="inline mr-2" />
          Export to PDF
        </button>
  
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
  
        {/* Printable content - positioned off-screen */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div ref={componentRef} className="p-8">
            <h1 className="text-2xl font-bold mb-6">Mood Journal Report</h1>
            <p className="text-gray-600 mb-2">
              Generated on {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-8">
              Total entries: {entries.length}
            </p>
            
            {entries.map((entry, index) => (
              <div 
                key={index} 
                className="entry mb-8 pb-4 border-b border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </h2>
                  <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                    {entry.mood}
                  </span>
                </div>
                
                {entry.weather && (
                  <p className="text-gray-700 mb-2">
                    <strong>Weather:</strong> {entry.weather.condition} ({Math.round(entry.weather.temp)}°C)
                  </p>
                )}
                
                {entry.note && (
                  <div className="mt-3 bg-gray-50 p-3 rounded">
                    <p className="whitespace-pre-wrap">{entry.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };