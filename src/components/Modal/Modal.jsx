import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useSelector } from 'react-redux';
import {
    selectModalText,
    selectModalOnConfirm,
    selectModalOnCancel,
    selectModalIsOpen,
} from '../../selectors';
import { useEffect } from 'react';

const ModalContainer = ({ className }) => {
    const text = useSelector(selectModalText);
    const onConfirm = useSelector(selectModalOnConfirm);
    const onCancel = useSelector(selectModalOnCancel);
    const isOpen = useSelector(selectModalIsOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3 className="title">{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onConfirm}>
                        Да
                    </Button>
                    <Button width="120px" onClick={onCancel}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Modal = styled(ModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;

    & .overlay {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    & .box {
        top: 30%;
        transform: translate(0, -50%);
        position: relative;
        width: 400px;
        margin: 100px auto;
        z-index: 30;
        background: #cdd0ca;
        padding: 20px;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        border: 1px solid #000;
    }

    & .title {
        display: flex;
        font-size: 1.2em;
        margin: 0 auto 20px;
        text-align: center;
    }

    & .buttons {
        display: flex;
        justify-content: space-between;
    }
`;
