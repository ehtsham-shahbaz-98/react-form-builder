import React, { useRef } from 'react';

const DoubleClick = ({ onClick = () => { }, onDoubleClick = () => { }, children }) => {
    const timer = useRef()
    const [showChild, setShowChild] = React.useState(false);

    console.log("Inside Double Click")

    const onClickHandler = event => {
        switch (event.detail) {
            case 1:
                console.log("click");
                break;
            case 2:
                setShowChild(true);
                console.log("Double Click")
                break;
        }
    }

    return (
        <div onClick={onClickHandler}>
            {showChild ? (
                <>
                    {children}
                </>
            ) : (<></>)}
        </div>
    )
}

export default DoubleClick;