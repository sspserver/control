import PageLoadSpinner from '@components/PageLoadSpinner';

function PageStreamingSpinner() {
  return (
    <div className="fixed z-50 top-0 left-0 h-full w-full flex items-center justify-center backdrop-blur-sm">
      <PageLoadSpinner />
    </div>
  );
}

export default PageStreamingSpinner;
