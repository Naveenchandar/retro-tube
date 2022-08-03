import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal as ReactModal } from 'react-bootstrap';

export function Modal({ open, close, type, onOk }) {
    const [disableBtn, setDisableBtn] = useState();

    const okHandler = () => {
        setDisableBtn(true);
        onOk();
    }

    useEffect(() => {
        return () => {
            setDisableBtn(false);
        }
    }, [])

    if (!open) return null;
    return (
        ReactDOM.createPortal(
            <ReactModal
                show={open}
                onHide={close}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ReactModal.Header closeButton>
                    <ReactModal.Title as='h2'>{type}</ReactModal.Title>
                </ReactModal.Header>
                <ReactModal.Body as='h4'>Are you sure you want to delete video from {type}?</ReactModal.Body>
                <ReactModal.Footer>
                    <Button variant="secondary" onClick={close}>
                        No
                    </Button>
                    <Button variant="primary" onClick={okHandler} disabled={disableBtn}>
                        {disableBtn ? 'Loading...' : 'Yes'}
                    </Button>
                </ReactModal.Footer>
            </ReactModal>,
            document.getElementById('root-modal')
        )
    )
}