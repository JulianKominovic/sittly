import React from 'react';

export const SafariIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" {...props}>
    <defs>
      <linearGradient
        id="a"
        x1={7.937}
        x2={7.937}
        y1={15.081}
        y2={1.852}
        gradientTransform="scale(3.7796)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f8fcfc" offset={0} />
        <stop stopColor="#fff" offset={1} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={-868.78}
        x2={-868.78}
        y1={-881.36}
        y2={-879.35}
        gradientTransform="matrix(51.93 0 0 -51.93 45175 -45657)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1e6ff1" offset={0} />
        <stop stopColor="#28cefb" offset={1} />
      </linearGradient>
    </defs>
    <image
      x={1.559}
      y={2}
      width={60.882}
      height={62.001}
      preserveAspectRatio="none"
      xlinkHref="data:image/png;base64,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"
    />
    <rect x={4} y={3.969} width={56.002} height={56.002} rx={13.002} ry={13.002} fill="url(#a)" />
    <g transform="matrix(.47985 0 0 .47985 3.161 3.21)" data-name='Home-Screen-11"'>
      <circle
        cx={60.1}
        cy={60}
        r={52.1}
        style={{
          fill: 'url(#b)'
        }}
      />
      <path
        d="M60.102 107.48v-8"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeWidth: 1.00300002,
          strokeLinecap: 'square'
        }}
      />
      <path
        d="M60.102 20.48v-8"
        data-name="Line-2"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeWidth: 1.00300002,
          strokeLinecap: 'square'
        }}
      />
      <g
        data-name="Group-11"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeWidth: 1.00300002,
          strokeLinecap: 'square'
        }}
      >
        <path
          d="m51.832 106.79 1.39-7.878m13.717-77.8 1.39-7.879M43.852 104.63l2.736-7.518m27.02-74.236 2.736-7.517M36.312 101.17l4-6.928m39.5-68.416 4-6.928M29.612 96.395l5.142-6.128m50.78-60.518 5.143-6.129M23.662 90.519l6.128-5.142m60.518-50.78 6.129-5.143M18.946 83.721l6.928-4m68.416-39.5 6.928-4M15.386 76.252l7.518-2.736m74.236-27.02 7.517-2.736M13.291 68.299l7.878-1.39m77.8-13.717 7.879-1.39M12.618 60.002h8m79 0h8M13.314 51.784l7.878 1.39m77.8 13.717 7.879 1.39M15.47 43.772l7.518 2.736m74.236 27.02 7.517 2.736M18.928 36.307l6.928 4m68.416 39.5 6.928 4M23.678 29.438l6.128 5.142m60.518 50.78 6.129 5.143M29.51 23.626l5.142 6.128m50.78 60.517 5.143 6.129M36.32 18.86l4 6.928m39.5 68.416 4 6.928M43.854 15.359l2.736 7.518m27.02 74.236 2.736 7.517M51.802 13.292l1.39 7.878m13.717 77.8 1.39 7.879M55.937 107.31l.349-3.985m7.582-86.669.349-3.985M47.82 105.93l1.035-3.864M71.372 18.03l1.036-3.863M39.998 103.02l1.69-3.625m36.768-78.85 1.691-3.624M32.84 98.927l2.294-3.277m49.901-71.266 2.295-3.276M26.541 93.591l2.829-2.828m61.517-61.518 2.829-2.829M21.191 87.294 24.468 85m71.266-49.901 3.276-2.295M17.061 80.089l3.625-1.69m78.85-36.769 3.624-1.69M14.204 72.327l3.864-1.035m84.036-22.517 3.863-1.036M12.737 64.152l3.985-.349m86.669-7.582 3.985-.349M12.771 55.872l3.985.349m86.669 7.582 3.985.349M14.146 47.753l3.864 1.035m84.036 22.517 3.863 1.036M17.028 39.921l3.625 1.69m78.85 36.769 3.624 1.69M21.175 32.8l3.277 2.294m71.266 49.901 3.276 2.295M26.536 26.443l2.828 2.828M90.882 90.79l2.829 2.829M32.789 21.084l2.294 3.277m49.901 71.266 2.295 3.276M40.023 16.989l1.69 3.625m36.769 78.85 1.69 3.624M47.774 14.173l1.035 3.864m22.517 84.036 1.036 3.863M55.895 12.711l.349 3.985m7.582 86.669.349 3.985"
          data-name="Line-2"
        />
      </g>
      <g
        style={{
          fillRule: 'evenodd'
        }}
      >
        <path
          style={{
            fill: '#fff'
          }}
          d="m55.97 55.36-32.9 35.7 41.3-25.7 32.7-36.3z"
        />
        <path
          style={{
            fill: '#ff3b30'
          }}
          d="m64.37 65.36 32.7-36.3-41.1 26.3z"
        />
      </g>
    </g>
  </svg>
);
