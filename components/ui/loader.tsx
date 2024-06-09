export default function Loader() {
  return (
    <div className="fixed w-full min-h-screen bg-black/75 top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center">
      <div className="w-[250px] h-[200px] bg-white rounded-md flex items-center justify-center flex-col">
        <p className="text-[#181818] font-medium text-lg mb-8">
          Loading please wait...
        </p>
        <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    </div>
  );
}
