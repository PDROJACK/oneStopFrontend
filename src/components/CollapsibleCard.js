import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ChevronDown } from "react-feather";
import { useSpring, animated, config } from "@react-spring/native";
import BezierEasing from "bezier-easing";

const propTypes = {
  children: PropTypes.node,
  contentHeight: PropTypes.number,
  defaultCollapsed: PropTypes.bool,
  style: PropTypes.any,
  title: PropTypes.string,
  data: Object,
  options: Object,
  goToSearch: Function,
  renderContent: Function,
  useBezier: PropTypes.bool,
};

const defaultProps = {
  contentHeight: 300,
};

function CollapsibleCard({
  children,
  contentHeight,
  defaultCollapsed,
  style,
  title,
  data,
  goToRides,
  useBezier,
  ...props
}) {
  const [isCollapsed, setCollapsed] = useState(
    defaultCollapsed ? defaultCollapsed : true
  );

  const animationConfig = {
    height: isCollapsed ? 0 : contentHeight,
    progress: isCollapsed ? 0 : 100,
    rotation: isCollapsed ? `0deg` : `-180deg`,
    // config: config.stiff,
  };

  if (useBezier) {
    animationConfig.config = {
      duration: 600,
      easing: (t) => BezierEasing(0.25, 0, 0, 1)(t),
    };
  }

  const animation = useSpring(animationConfig);
  const AnimatedView = animated(View);

  return (
    <View {...props} style={[styles.card, style]}>
      {/* Card Top */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // renderContent(data),
          setCollapsed((c) => !c)
          }
        }
        style={styles.cardTop}
      >
        {/* Card Left */}
        <View>
          <Text style={{fontWeight:"bold"}}>INR {data.estimated_price.toFixed(2)}</Text>
          {/* <Text style={{fontWeight:"bold"}}></Text> */}
          <Text>Car - Plane - Car</Text>
        </View>

        {/* Card Right  */}
        <View style={{backgroundColor: "black", borderRadius: 12, width: 70}}>
          <TouchableOpacity onPress={()=>goToRides(data)}>
            <Text style={{color: "white", fontSize: 12, marginLeft: 10 }}>{(data.Duration/3600).toFixed(2)} hr</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Card Content */}
      <AnimatedView
        style={[
          styles.cardContent,
          {
            height: animation.height,
            borderTopWidth: animation.progress.interpolate({
              range: [0, 25, 50, 75, 100],
              output: [0, 0, 0, 0, 1],
            }),
            opacity: animation.progress.interpolate({
              range: [0, 85, 95, 100],
              output: [0, 0, 0.5, 1],
            }),
          },
        ]}
      >
        {/* Inner */}
        <AnimatedView
          style={{
            transform: [
              {
                translateY: animation.progress.interpolate({
                  range: [0, 85, 95, 100],
                  output: [7.5, 5, 2.5, 0],
                }),
              },
            ],
          }}
        >
          {children}
        </AnimatedView>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 5,
    margin: 5
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 8,
    marginHorizontal: 6
  },
  cardContent: {
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

CollapsibleCard.propTypes = propTypes;
CollapsibleCard.defaultProps = defaultProps;

export default CollapsibleCard;
