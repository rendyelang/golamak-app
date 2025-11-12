import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SkeletonDetail() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Skeleton colorMode="light" width={"100%"} height={280} radius={0} />

          {/* Floating circular buttons */}
          <View style={styles.floatingButtons}>
            <Skeleton colorMode="light" width={40} height={40} radius={20} />
            <Skeleton colorMode="light" width={40} height={40} radius={20} />
          </View>
        </View>

        {/* Text Section */}
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Skeleton colorMode="light" width={180} height={24} radius={8} />
          <View style={{ marginTop: 12 }}>
            <Skeleton colorMode="light" width={140} height={14} radius={6} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Skeleton colorMode="light" width={220} height={14} radius={6} />
          </View>
        </View>

        {/* Section Info */}
        <View style={{ marginTop: 24, marginLeft: 20 }}>
          <Skeleton colorMode="light" width={160} height={18} radius={6} />
        </View>

        {/* Avatar Row */}
        <View style={styles.avatarRow}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} style={styles.avatarItem}>
              <Skeleton colorMode="light" width={85} height={70} radius={12} />
              <View style={{ marginTop: 10 }}>
                <Skeleton colorMode="light" width={85} height={10} radius={6} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Bar (fixed di bawah screen) */}
      <View style={styles.bottomBar}>
        <View className="flex-row justify-between items-center">
          <View style={styles.iconRow}>
            <Skeleton colorMode="light" width={28} height={28} radius={14} />
            <Skeleton colorMode="light" width={18} height={18} radius={14} />
            <Skeleton colorMode="light" width={28} height={28} radius={14} />
          </View>
          <View className="flex-col gap-y-2">
            <Skeleton colorMode="light" width={70} height={18} radius={6} />
            <Skeleton colorMode="light" width={70} height={24} radius={6} />
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Skeleton colorMode="light" width={"100%"} height={36} radius={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  coverContainer: {
    position: "relative",
  },
  floatingButtons: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  avatarItem: {
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    columnGap: 12,
  },
});
