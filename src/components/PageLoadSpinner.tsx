const styles = `
    .cell {
         transform-origin: center;
        animation: rotateAnimation 3s infinite ease-in-out;
    }
    
    @keyframes rotateAnimation {
        0%, 10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
    .cell:nth-child(1)  { animation-delay: 0s; }
    .cell:nth-child(2)  { animation-delay: 0.1s; }
    .cell:nth-child(3)  { animation-delay: 0.2s; }
    .cell:nth-child(4)  { animation-delay: 0.3s; }
    .cell:nth-child(5)  { animation-delay: 0.4s; }
    .cell:nth-child(6)  { animation-delay: 0.5s; }
    .cell:nth-child(7)  { animation-delay: 0.6s; }
    .cell:nth-child(8)  { animation-delay: 0.7s; }
    .cell:nth-child(9)  { animation-delay: 0.8s; }
    .cell:nth-child(10) { animation-delay: 0.9s; }
    .cell:nth-child(11) { animation-delay: 1s; }
    .cell:nth-child(12) { animation-delay: 1.1s; }
    .cell:nth-child(13) { animation-delay: 1.2s; }
    .cell:nth-child(14) { animation-delay: 1.3s; }
    .cell:nth-child(15) { animation-delay: 1.4s; }
    .cell:nth-child(16) { animation-delay: 1.5s; }
    .cell:nth-child(17) { animation-delay: 1.6s; }
    .cell:nth-child(18) { animation-delay: 1.7s; }
    .cell:nth-child(19) { animation-delay: 1.8s; }
`;

function PageLoadSpinner() {
  return (
    <div className="h-[calc(100vh-400px)] flex items-center justify-center">
      <div className="m-auto blur-[2px] text-[#47556980] size-1/6 ">
        <svg viewBox="0 0 297 306" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>
            {styles}
          </style>

          <path className="cell" d="M110.053 83L143.053 102.053L110.053 121.105L110.053 83Z" fill="currentColor" />
          <path className="cell" d="M161.053 204.053L194.053 185V223.105L161.053 204.053Z" fill="currentColor" />
          <path className="cell" d="M252.053 154.053L285.053 135V173.105L252.053 154.053Z" fill="currentColor" />
          <path className="cell" d="M161.053 102.053L194.053 83V121.105L161.053 102.053Z" fill="currentColor" />
          <path className="cell" d="M71.0526 153.053L104.053 134V172.105L71.0526 153.053Z" fill="currentColor" />
          <path className="cell" d="M110.053 185L143.053 204.053L110.053 223.105L110.053 185Z" fill="currentColor" />
          <path className="cell" d="M201.053 238L234.053 257.053L201.053 276.105L201.053 238Z" fill="currentColor" />
          <path className="cell" d="M202.053 30L235.053 49.0526L202.053 68.1051L202.053 30Z" fill="currentColor" />
          <path className="cell" d="M69.0526 47.0526L102.053 28V66.1051L69.0526 47.0526Z" fill="currentColor" />
          <path className="cell" d="M69.0526 258.053L102.053 239V277.105L69.0526 258.053Z" fill="currentColor" />
          <path className="cell" d="M19.0526 134L52.0526 153.053L19.0526 172.105L19.0526 134Z" fill="currentColor" />
          <path className="cell" d="M200.053 135L233.053 154.053L200.053 173.105L200.053 135Z" fill="currentColor" />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M195.301 128L152 103L108.699 128V178L152 203L195.301 178V128ZM186.641 133L152 113L117.359 133V173L152 193L186.641 173V133Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M195.301 25L152 0L108.699 25V75L152 100L195.301 75V25ZM186.641 30L152 10L117.359 30V70L152 90L186.641 70V30Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M195.301 231L152 206L108.699 231V281L152 306L195.301 281V231ZM186.641 236L152 216L117.359 236V276L152 296L186.641 276V236Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M285.301 78L242 53L198.699 78V128L242 153L285.301 128V78ZM276.641 83L242 63L207.359 83V123L242 143L276.641 123V83Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M285.301 180L242 155L198.699 180V230L242 255L285.301 230V180ZM276.641 185L242 165L207.359 185V225L242 245L276.641 225V185Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M105.301 180L62 155L18.6987 180V230L62 255L105.301 230V180ZM96.641 185L62 165L27.359 185V225L62 245L96.641 225V185Z"
            fill="currentColor"
          />
          <path
            className="cell"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M105.301 76L62 51L18.6987 76V126L62 151L105.301 126V76ZM96.641 81L62 61L27.359 81V121L62 141L96.641 121V81Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default PageLoadSpinner;
