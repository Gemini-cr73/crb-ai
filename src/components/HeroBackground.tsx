"use client";

export default function HeroBackground() {
    return (
        <div className="hero-bg pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-bg__glow hero-bg__glow--one" />
            <div className="hero-bg__glow hero-bg__glow--two" />
            <div className="hero-bg__glow hero-bg__glow--three" />
            <div className="hero-bg__scanlines" />
            <div className="hero-bg__overlay" />
            <div className="hero-bg__noise" />
        </div>
    );
}
