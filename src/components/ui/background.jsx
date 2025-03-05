import React from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[210px] w-[210px] rounded-full bg-primary/30 opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-[250px] w-[250px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
    </div>
  );
}

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3b82f620,transparent_50%),radial-gradient(ellipse_at_bottom,#10b98120,transparent)]"></div>
    </div>
  );
}

export function BackgroundGlassmorphism() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-1/4 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-secondary/30 opacity-20 blur-[100px]"></div>
    </div>
  );
}
