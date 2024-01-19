
function Body() {
  return (
    <>
      <div className='' style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <div
        className='w-[100%] h-[500px] left-[-300px] top-[-100px] z-0 bg-[#1B2947] opacity-50 rounded-[100%] absolute blur-3xl'
        style={{ transform: 'rotate(45deg)', transformOrigin: '0 100%', bottom: '-300px', right: '-100px' }}
      ></div>
      <div
        className='w-[100%] h-[500px] right-[-300px] bottom-[-100px] z-0 bg-[#1B2947] opacity-50 rounded-[100%] absolute blur-3xl'
        style={{ transform: 'rotate(45deg)', transformOrigin: '100% 100%', bottom: '-300px', right: '-100px' }}
      ></div>
    </div>
    <div className='z-0' style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <div
        className='w-[100%] h-[500px] left-[-300px] top-[-100px] z-0 bg-[#1B2947] opacity-50 rounded-[100%] absolute blur-3xl'
        style={{ transform: 'rotate(45deg)', transformOrigin: '0 100%', bottom: '-300px', right: '-100px' }}
      ></div>
      <div
        className='w-[100%] h-[500px] right-[-300px] bottom-[-100px] z-0 bg-[#1B2947] opacity-50 rounded-[100%] absolute blur-3xl'
        style={{ transform: 'rotate(45deg)', transformOrigin: '100% 100%', bottom: '-300px', right: '-100px' }}
      ></div>
    </div>
    </>
  );
}

export default Body;

