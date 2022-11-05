import React from "react";
import styles from "../styles/Progressbar.module.scss";

const ProgressBar = ({ completed }) => {
    // const { bgcolor, completed } = props;
    // const { completed } = props;

    const containerStyles = {
        // height: 10,
        // width: "100px",
        // backgroundColor: "#e0e0de",
        // marginLeft: 10,

        //   borderRadius: 50,
        //   marginTop:10,
        //   margin: 50,
        //   paddingRight: 20,
    };

    const fillerStyles = {
        width: `${completed}%`,
        // height: "100%",
        // backgroundColor: "blue",
        // borderRadius: "inherit",
        // textAlign: "right",

        //   width: `${completed}%`,
        // width: "200px",
        //   backgroundColor: bgcolor,
    };

    const labelStyles = {
        // padding: 5,
        // color: "white",
        // fontWeight: "bold",
    };

    return (
        <div
            // style={containerStyles} 
            className={styles.progressbar_wrapper}>
            <div style={fillerStyles} className={styles.progressbar_line_div}>
                {/* <span style={labelStyles}>{`${completed}%`}</span> */}
                {/* <span style={labelStyles}>{`${completed}px`}</span> */}
                {/* <span
                    // style={labelStyles} 
                    className={styles.progressbar_line}></span> */}
            </div>
        </div>
    );
};


export default ProgressBar;