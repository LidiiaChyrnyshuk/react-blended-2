import { FallingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div
      styles={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};
