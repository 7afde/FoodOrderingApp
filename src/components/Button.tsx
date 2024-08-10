import { Pressable, Text, View } from "react-native";
import { forwardRef } from "react";

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        className="bg-blue-500 p-4 rounded-full my-2 items-center"
      >
        <Text className="text-lg font-semibold text-white">{text}</Text>
      </Pressable>
    );
  }
);

export default Button;
