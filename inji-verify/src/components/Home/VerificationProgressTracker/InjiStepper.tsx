import React from 'react';
import {useAppSelector} from "../../../redux/hooks";
import {VerificationStep} from "../../../types/data-types";

const steps: VerificationStep[] = [
    {
        label: 'Scan QR Code or Upload QR code',
        description: 'Tap the button and display the QR code shown on your digital credentials / card',
    },
    {
        label: 'Activate your device’s camera',
        description:
            'Activate your device camera for scanning: A notification will be prompt to activate your device camera',
    },
    {
        label: 'Verification',
        description: 'Validating and verification of your digital document / card'
    },
    {
        label: 'Result',
        description: 'Credibility result of your digital document / card'
    }
];


function InjiStepper() {
    const activeScreen = useAppSelector(state => state.activeScreen);
    const isLastStep = (index: number) => steps.length -1 === index;
    const isStepCompleted = (index: number) => activeScreen >= index;

    return (
        <div className="flex flex-col items-start justify-start ml-0 mt-9">
            <div className="flex flex-col items-start space-y-2">
                {
                    steps.map((step, index) => (
                        <>
                            <div className="flex items-center">
                                <div
                                    className={`text-center rounded-full w-6 h-6 flex items-center justify-center font-normal text-normal text-[12px] leading-5 font-inter ${isStepCompleted(index) ? "bg-[#FF7F00] text-white border-1 border-none" : "bg-white text-[#FF7F00] border-[1px] border-[#FF7F00]"}`}
                                >
                                    {index + 1}
                                </div>
                                <div className={`ml-[10px] text-[16px] font-inter font-bold ${isStepCompleted(index) ? "text-black" : "text-[#868686]"}`}>{step.label}</div>
                            </div>
                            <div className={"grid items-center m-0"}>
                                <div className="w-6 h-[100%] col-end-2">
                                    <div className={`${!isLastStep(index) ? "border-l-[#FF7F00]" : "border-none"} border-[1px] h-[100%] m-auto w-0`}/>
                                </div>
                                <div
                                    className="ml-[10px] text-[14px] text-[#535353] font-normal leading-5 font-inter col-end-13">
                                    {step.description}
                                </div>
                                {
                                    !isLastStep(index) && (
                                        <div className="border-l-[#FF7F00] border-[1px] h-8 m-auto col-end-2"/>
                                    )
                                }
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    );
}

export default InjiStepper;
