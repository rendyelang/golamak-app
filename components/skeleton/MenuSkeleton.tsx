// components/skeletons/MenuSkeleton.tsx
import { MotiView } from "moti";
import { View } from "react-native";

export default function MenuSkeleton() {
  return (
    <View className="flex-row justify-between flex-wrap gap-y-5 mt-4">
      {[...Array(6)].map((_, i) => (
        <MotiView
          key={i}
          style={{
            width: "48%",
            height: 180,
            backgroundColor: "#E5E7EB",
            borderRadius: 16,
          }}
          transition={{ type: "timing" }}
          animate={{ opacity: [0.4, 1] }}
        />
      ))}
    </View>
  );
}
