
import styled from "styled-components";
const Loader = ({ darkMode }) => {
    return (
      <LoaderWrapper darkMode={darkMode}>
        <div className="spinner">
          <div className="spinner1" />
        </div>
      </LoaderWrapper>
    );
  };
  
  const LoaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? "rgba(18, 18, 18, 1)" : "#f5faff")};
    z-index: 9999;
  
    .spinner {
      background-image: linear-gradient(#81a3bb 35%, #00152e);
      width: 100px;
      height: 100px;
      animation: spinning82341 1.7s linear infinite;
      text-align: center;
      border-radius: 50px;
      filter: blur(1px);
      box-shadow: 0px -5px 20px 0px #81a3bb, 0px 5px 20px 0px #00152e;
    }
  
    .spinner1 {
      background-color: ${({ darkMode }) => (darkMode ? "rgb(36, 36, 36)" : "#d1d5db")};
      width: 100px;
      height: 100px;
      border-radius: 50px;
      filter: blur(10px);
    }
  
    @keyframes spinning82341 {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  
  export default Loader;