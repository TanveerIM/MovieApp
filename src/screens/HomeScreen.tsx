import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCards';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let reponse = await fetch(nowPlayingMovies);
    let json = await reponse.json();
    return json
  } catch(error) {
    console.error('Something went wrong in getNowPlayingMoviesList Function', error)
  }
}

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = response.json();
    return json
  } catch(error) {
    console.error('Something went wrong in getUpcomingMoviesList Function', error)
  }
}

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = response.json();
    return json
  } catch(error) {
    console.error('Something  went wrong in getPopularMoviesList Function', error)
  }
}

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    React.useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] =
    React.useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] =
    React.useState<any>(undefined);

    React.useEffect(() => {
      (async() => {
        let tempNowPlaying = await getNowPlayingMoviesList();
        setNowPlayingMoviesList(tempNowPlaying.results);

        let tempPopular = await getPopularMoviesList();
        setPopularMoviesList(tempPopular.results);

        let tempUpcoming = await getUpcomingMoviesList();
        setUpcomingMoviesList(tempUpcoming.results);

      })();
    }, []);

    console.log(nowPlayingMoviesList.length)

    const searchMoviesFunction = () => {
      navigation.navigate('Search')
    }
  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return <ScrollView style={styles.container} bounces={false}
    contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />
      
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    </ScrollView>;
  }

  return (
    <ScrollView style={styles.container} bounces={false}
    contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />
      
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <CategoryHeader title={'Popular'} />
      <CategoryHeader title={'Upcoming'} />
      <FlatList
      data={upcomingMoviesList}
      keyExtractor={(item: any) => item.id}
       horizontal
       contentContainerStyle={styles.containerGap36}
       renderItem={({item, index}) => (
        <SubMovieCard title={item.original_title} />
       )} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  }
});
