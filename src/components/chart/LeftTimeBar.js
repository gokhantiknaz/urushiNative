import React from "react";
import { StyleSheet, View } from "react-native";

import Svg, { Defs, Path, RadialGradient, Rect, Stop } from "react-native-svg";

const LeftTimeBar = ({ layout }) => {
	const wM = 0.25;
	const bar = `M0 0C${layout.width * wM} 0 ${layout.width * wM} ${layout.height} 0 ${layout.height}L0 ${layout.height}`;
	const barShadow = `M0 0C${layout.width * 0.75} 0 ${layout.width * 0.75} ${layout.height} 0 ${layout.height}L0 ${layout.height}`;

	// ${layout.width*0.1} ${layout.height}`;

	return (
		<View style={styles.leftTimeBar}>
			<Svg
				height="100%"
				width="100%">
				<Defs>
					<RadialGradient
						id="grad"
						cx="0%"
						cy="50%"
						rx="25%"
						ry="75%"
						fx="5%"
						fy="5%"
						gradientUnits="userSpaceOnUse">
						<Stop
							offset="1"
							stopColor="#ffffff00"
							stopOpacity="0"
						/>
						<Stop
							offset="0"
							stopColor="#414141"
							stopOpacity="0.7"
						/>
					</RadialGradient>
				</Defs>
				<Path
					d={barShadow}
					x="15"
					fill="url(#grad)"
				/>
				<Path
					d={bar}
					fill="#f3f3f3"
				/>
			</Svg>
		</View>
	);
};
const styles = StyleSheet.create({
	leftTimeBar: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		opacity: 0.75,

	}
});

export default LeftTimeBar;
