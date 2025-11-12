import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SkeletonHome() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Skeleton colorMode="light" width={120} height={24} radius={6} />
        <Skeleton colorMode="light" width={36} height={36} radius={18} />
      </View>

      {/* Search bar */}
      <View style={{ marginTop: 100 }}>
        <Skeleton colorMode="light" width={"100%"} height={45} radius={12} />
      </View>

      {/* Promo banner */}
      <View style={{ marginTop: 20 }}>
        <Skeleton colorMode="light" width={"100%"} height={150} radius={18} />
      </View>

      {/* Categories */}
      <View style={styles.categoryRow}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.categoryItem}>
            <Skeleton colorMode="light" width={80} height={80} radius={12} />
            <View style={{ marginTop: 8 }}>
              <Skeleton colorMode="light" width={50} height={10} radius={6} />
            </View>
          </View>
        ))}
      </View>

      {/* Section title */}
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Skeleton colorMode="light" width={160} height={18} radius={6} />
      </View>

      {/* Menu cards (2 columns) */}
      <View style={styles.menuGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.menuCard}>
            <Skeleton colorMode="light" width={"100%"} height={130} radius={16} />
            <View style={{ marginTop: 10 }}>
              <Skeleton colorMode="light" width={"80%"} height={12} radius={6} />
            </View>
            <View style={{ marginTop: 6 }}>
              <Skeleton colorMode="light" width={"60%"} height={10} radius={6} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  categoryItem: {
    alignItems: "center",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuCard: {
    width: (width - 60) / 2,
    marginBottom: 25,
  },
});
