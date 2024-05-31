import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {closeAlert} from "../../redux/features/alerts/alerts.slice";
import {ReactComponent as CloseIcon} from "../../assets/close_icon.svg";
import {useAlertsSelector} from "../../redux/features/alerts/alerts.selector";

const backgroundColorMapping: any = {
    warning: "bg-[#BF7A1C]",
    error: "bg-[#D73E3E]",
    success: "bg-[#57A04B]"
}

const AlertMessage = () => {
    const alertInfo = useAlertsSelector();
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(closeAlert({}));

    useEffect(() => {
        if (alertInfo.open) {
            const timer = setTimeout(() => {
                dispatch(closeAlert({}))
            }, alertInfo.autoHideDuration ?? 3500);
            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    return (
        <>
            <div
                className={`fixed top-[44px] right-[16px] py-[22px] px-[18px] text-white rounded-[12px] shadow-lg ${backgroundColorMapping[alertInfo.severity ?? "success"]} ${alertInfo.open ? "" : "hidden"}`}>
                <div className="flex items-center">
                    <p>
                        {alertInfo.message}
                    </p>
                    <div className="pl-4 cursor-pointer" onClick={handleClose}>
                        <CloseIcon/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertMessage;
