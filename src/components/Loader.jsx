
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
    background-color: ${({ darkMode }) => (darkMode ? "rgba(18, 18, 18, 1)" : "rgba(255, 255, 255, 1)")};
    z-index: 9999;
  
    .spinner {
      background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
      width: 100px;
      height: 100px;
      animation: spinning82341 1.7s linear infinite;
      text-align: center;
      border-radius: 50px;
      filter: blur(1px);
      box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
    }
  
    .spinner1 {
      background-color: ${({ darkMode }) => (darkMode ? "rgb(36, 36, 36)" : "rgb(200, 200, 200)")};
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