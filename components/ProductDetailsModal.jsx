import React from 'react';
import stylye from "../styles/ProductDetaislModal.module.scss";
import cadypaylogo from "./assets/cadypaylogo.png";
import Image from 'next/image';
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { TbHexagons } from "react-icons/tb";
import Link from 'next/link';

const ProductDetailsModal = ({ modalOpen, setModalOpen }) => {

    // className={productCss.icon}
    return (
        <div>
            {modalOpen &&
                <>
                    <div className={stylye.modalBackground}>
                        <div className={stylye.modalContainer}>

                            <div className={stylye.crossIconDiv} onClick={() => setModalOpen(false)}>
                                <h1 className={stylye.crossIcon}>x</h1>
                            </div>

                            <div className={stylye.heading_div}>
                                <div className={stylye.logo_div}>
                                    <Image
                                        src={cadypaylogo}
                                        alt="cadypay logo"
                                        className={stylye.logo}
                                        layout="fill"
                                        priority={true}
                                    /></div>
                                <h4 className={stylye.heading}>Split your purchase into 4 interest free payments</h4>
                            </div>

                            <div className={stylye.threeCard}>
                                <div className={stylye.card}>
                                    <div className={stylye.interest_icon_div}><BsBank className={stylye.interest_icon} /></div>
                                    <h6 className={stylye.card_heading}>
                                        0% interest, <br />no hidden fees
                                    </h6>
                                    <p className={stylye.card_para}>
                                        No hidden charges. What you see is what you pay.
                                    </p>
                                </div>
                                <div className={stylye.card}>
                                    <div className={stylye.icon_div}><AiOutlineFieldTime className={stylye.icon} /></div>
                                    <h6 className={stylye.card_heading}>
                                        Apply in seconds with no impact to your credit score
                                    </h6>
                                    <p className={stylye.card_para}>
                                        Get approved instantly* in just a few easy steps.
                                    </p>
                                </div>
                                <div className={stylye.card}>
                                    <div className={stylye.icon_div}><TbHexagons className={stylye.icon} /></div>
                                    <h6 className={stylye.card_heading}>
                                        Easily track your payments
                                    </h6>
                                    <p className={stylye.card_para}>
                                        Our portal allows you to see and easily keep track of your payment schedule.
                                    </p>
                                </div>
                            </div>

                            <div className={stylye.paragraph_div}>
                                <h4 className={stylye.heading}>
                                    Just select Caddipay at checkout
                                </h4>
                                <p className={stylye.para}>
                                    *Subject to approval. Qualification criteria applies. Down payment may be required. Estimated payment may exclude taxes and shipping fees.
                                    A higher initial payment may be required for some customers.
                                </p>
                                <p className={stylye.para}>
                                    Payment options through Caddipay are provided by
                                    <Link href="https://www.greatamericanfinance.com/">
                                        <a target="_blank" className={stylye.blur_link}> Great American Finance.</a>
                                        {/* <span className={stylye.blur_link}> Great American Finance.</span> */}
                                    </Link>
                                    See details at
                                    <Link href="https://www.caddipay.com/help">
                                        <a target="_blank" className={stylye.blur_link}> Caddipay's Help Center.</a>
                                    </Link>

                                    {/* See details at <span className={stylye.blur_link}>Caddipay's Help Center.</span> */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={stylye.modal_background_Shadow}>
                        
                    </div>
                </>
            }
        </div>

    );
}

export default ProductDetailsModal;