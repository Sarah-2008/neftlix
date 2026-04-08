import { View, ScrollView, StyleSheet } from 'react-native'
import { useMovies } from '../../src/hooks/useMovies'
import MovieCard from '../../src/components/MovieCard'

export default function Home() {
  const { movies } = useMovies()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  list: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }
})
