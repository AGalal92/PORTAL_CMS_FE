// ArrowButton.js
import React from 'react';

const ArrowButton = ({ direction, onClick, className }) => {
    const baseClass = "arrow " + direction;
    const fullClass = className ? `${baseClass} ${className}` : baseClass;
    const svgBase64 = direction === 'prev' 
        ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICAgIGQ9Ik0yMC42NTQgOS40M2wtNi4zMjYgNi41MjUgNi4zMjYgNi42Yy4yNDIuMjUzLjM2LjU0NS4zNi44OCAwIC4zMzMtLjExOC42MjUtLjM2Ljg3N2wtMS4yNDQgMS4zYy0uMjQuMjUtLjUyMy4zNzUtLjg0LjM3NS0uMzIgMC0uNi0uMTI0LS44NC0uMzc2bC04LjM2Ny04LjcyYy0uMjQtLjI1LS4zNjMtLjU0LS4zNjMtLjg4IDAtLjMzNC4xMjItLjYzLjM2My0uODhsOC4zNjctOC43NWMuMjMtLjI1Mi41MS0uMzc3LjgzLS4zNzcuMzI1IDAgLjYwNy4xMjYuODUuMzc4bDEuMjQyIDEuMzI2Yy4yNDIuMjUyLjM2LjU0LjM2Ljg2NCAwIC4zMi0uMTE4LjYxLS4zNi44NnoiCiAgICAgICAgICBvcGFjaXR5PSIwLjgiLz4KPC9zdmc+Cg=='
        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMy4yODYgMjUuNjFjLS4yNC4yNTMtLjUyLjM3Ny0uODQuMzc3LS4zMTggMC0uNi0uMTI0LS44NC0uMzc2bC0xLjI0NS0xLjI5N2MtLjI0LS4yNTItLjM2LS41NDQtLjM2LS44NzggMC0uMzM0LjEyLS42MjYuMzYtLjg3OGw2LjMyOC02LjZMMTAuMzYgOS40M2MtLjI0LS4yNS0uMzYtLjU0LS4zNi0uODY0IDAtLjMyMy4xMi0uNjEyLjM2LS44NjRsMS4yNDUtMS4zMjVjLjI0LS4yNTIuNTIzLS4zNzcuODQ4LS4zNzcuMzIzIDAgLjYwMi4xMjUuODMzLjM3N2w4LjM2NiA4Ljc0NmMuMjQuMjUuMzYzLjU0Ni4zNjMuODgyIDAgLjM0LS4xMjIuNjM0LS4zNjMuODg2bC04LjM2NiA4LjcyeiIKICAgICAgICAgIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==';

    return (
        <button className={fullClass} onClick={onClick} aria-label={`${direction} arrow`}>
            <img width="32" height="32" className="skip-lazy" data-skip-lazy="1" src={svgBase64} alt={`${direction} arrow`} />
        </button>
    );
};

export default ArrowButton;