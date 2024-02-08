import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';

const timeArray: string[] = [
  "10:30",
  "12:30",
  "14:30",
  "15:00",
  "19:30",
  "21:00",
]

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for(let i=0; i<7; i++) {
    let tempDate = {
      date:new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day:weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
}

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for(let i = 0; i < numRow; i++) {
    let columnArray = [];
    for(let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if(i==3) {
      numColumn +=2;
    }
    if(numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -=2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = React.useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = React.useState<any>();
  const [price, setPrice] = React.useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = React.useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = React.useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = React.useState<any>();

  const selectSeat = (index: number, subIndex: number, num: number) => {
    if(!twoDSeatArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if(!array.includes(num)) {
        
      }
    }
  }
  return (
    <ScrollView style={styles.container}
    bounces={false}
    showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
        source={{uri: route.params?.bgImage}} style={styles.ImageBG} >
          <LinearGradient colors={[COLORS.BlackRGB10, COLORS.Black]}
          style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
            <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
             />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {
            twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subitem, subIndex) => {
                    return (
                      <TouchableOpacity key={subitem.number} onPress={(() => {
                        selectSeat(index, subIndex, subitem.number);
                      })}>
                        <CustomIcon name='seat' style={[styles.seatIcon, subitem.taken ? {color: COLORS.Grey} : {},
                        subitem.selected ? {color:COLORS.Orange} : {},]} />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            })
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 3,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  }
});
