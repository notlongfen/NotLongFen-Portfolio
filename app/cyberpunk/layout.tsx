import CustomCursor from "@/components/dom/CustomCursor";
import { ErrorBoundaryWrapper } from "@/components/ErrorBoundaryWrapper";
import Noise from "@/components/dom/Noise";
import SmoothScroll from "@/components/dom/SmoothScroll";
import TerminalNav from "@/components/dom/TerminalNav";
import EditionSelector from "@/components/EditionSelector";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundaryWrapper theme="cyberpunk">
      <Noise />
      <CustomCursor />
      <EditionSelector />
      <SmoothScroll>
        <TerminalNav />
        {children}
      </SmoothScroll>
    </ErrorBoundaryWrapper>
  );
}
