// import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
// import { Calendar as ReactCalendar } from "react-native-calendars";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import moment from "moment/moment";

// export default Calendar = React.memo(
//   ({ showCalendar, setShowCalendar, onDayPress, selected }) => {
//     return (
//       <View style={{ position: "relative", width: "100%", marginTop: 5 }}>
//         <TouchableOpacity
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             columnGap: 5,
//           }}
//           onPress={() => {
//             setShowCalendar(!showCalendar);
//           }}
//         >
//           <Text style={{ fontSize: 16 }}>
//             {moment(selected?.startDate).format("MMMM D YYYY")} -{" "}
//             {moment(selected?.endDate).format("MMMM D YYYY")}
//           </Text>
//           <Ionicons name="caret-down" size={16} />
//         </TouchableOpacity>
//         {showCalendar && (
//           <ReactCalendar
//             style={{
//               position: "absolute",
//               top: 15,
//               left: 0,
//               zIndex: 40,
//               width: "100%",
//               elevation: 7.5,
//               borderRadius: 5,
//             }}
//             maxDate={Date()}
//             onDayPress={onDayPress}
//             markingType={"period"}
//             markedDates={selected.markedDates}
//           />
//         )}
//       </View>
//     );
//   }
// );
