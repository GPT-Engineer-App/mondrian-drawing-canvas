import React, { useRef, useState, useEffect } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { FaEraser, FaPalette } from "react-icons/fa";

const colors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"]; // Mondrian palette

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid #000" }}
      />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        <HStack>
          {colors.map((col) => (
            <Button
              key={col}
              backgroundColor={col}
              onClick={() => setColor(col)}
              size="lg"
              border={col === "#FFFFFF" ? "1px solid #000" : "none"}
              _hover={{ backgroundColor: col }}
            >
              {col === color && <FaPalette color={col === "#FFFFFF" ? "#000" : "#FFF"} />}
            </Button>
          ))}
        </HStack>
        <Button onClick={clearCanvas} leftIcon={<FaEraser />} colorScheme="red">
          Clear
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;