/* ============================================================
   EPIC CINEMATIC WEB AUDIO ENGINE (Pure JS Synthesizer)
   ============================================================ */
class EpicOceanAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.masterGain = null;
        this.ambientGain = null;
        this.isInitialized = false;
    }

    // เริ่มต้นระบบ AudioContext เมื่อผู้ใช้มี Interaction (กดปุ่ม)
    init() {
        if (this.isInitialized) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.isInitialized = true;
    }

    /* ----------------------------------------------------
       STAGE 1: Portal Energy Charge Up (ชาร์จพลังงานสะสม)
       ---------------------------------------------------- */
    playChargeUp(duration = 2.2) {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(50, now);
        osc1.frequency.exponentialRampToValueAtTime(950, now + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, now);
        filter.frequency.exponentialRampToValueAtTime(4500, now + duration);
        filter.Q.value = 9;

        gain1.gain.setValueAtTime(0.01, now);
        gain1.gain.linearRampToValueAtTime(0.5, now + duration * 0.85);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

        // LFO สร้างแรงสั่นสะเทือนถี่ขึ้นเรื่อยๆ
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(5, now);
        lfo.frequency.exponentialRampToValueAtTime(30, now + duration);
        lfoGain.gain.value = 0.25;
        
        lfo.connect(lfoGain);
        osc1.connect(filter);
        filter.connect(gain1);
        gain1.connect(this.masterGain);

        osc1.start(now);
        osc1.stop(now + duration);
        lfo.start(now);
        lfo.stop(now + duration);
    }

    /* ----------------------------------------------------
       STAGE 2: Black Hole Implosion (ยุบตัวกลืนแสง)
       ---------------------------------------------------- */
    playImplosion(duration = 1.6) {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(18, now + duration);

        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + duration);
    }

    /* ----------------------------------------------------
       STAGE 3: Epic Shockwave Blast (ระเบิดอิมแพ็คตระการตา)
       ---------------------------------------------------- */
    playCinematicBlast() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;

        // A. Sub-Bass Thump (เบสสะเทือนขวัญ 30Hz)
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(160, now);
        subOsc.frequency.exponentialRampToValueAtTime(25, now + 1.8);

        subGain.gain.setValueAtTime(1.0, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        subOsc.connect(subGain);
        subGain.connect(this.masterGain);
        subOsc.start(now);
        subOsc.stop(now + 2.2);

        // B. White Noise Shockwave (คลื่นระเบิดตูม)
        const bufferSize = this.ctx.sampleRate * 2.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(3200, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(60, now + 2.0);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        noise.start(now);

        // C. Crystal Shimmer Harmonics (ประกายคริสตัลกระจายตัว)
        const chimes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        chimes.forEach((freq, idx) => {
            const chimeOsc = this.ctx.createOscillator();
            const chimeGain = this.ctx.createGain();
            chimeOsc.type = 'triangle';
            chimeOsc.frequency.value = freq;

            chimeGain.gain.setValueAtTime(0.12, now + (idx * 0.04));
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

            chimeOsc.connect(chimeGain);
            chimeGain.connect(this.masterGain);
            chimeOsc.start(now + (idx * 0.04));
            chimeOsc.stop(now + 3.0);
        });
    }

    /* ----------------------------------------------------
       STAGE 4-5: Ocean Underwater Ambient (เสียงบรรยากาศทะเลลึก)
       ---------------------------------------------------- */
    startOceanAmbient() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const bufferSize = this.ctx.sampleRate * 5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        const oceanNoise = this.ctx.createBufferSource();
        oceanNoise.buffer = buffer;
        oceanNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 320;

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.12; // คลื่นซัดเบาๆ ทุกๆ 8 วินาที
        lfoGain.gain.value = 140;
        lfo.connect(filter.frequency);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.001, now);
        this.ambientGain.gain.linearRampToValueAtTime(0.22, now + 3.0); // Fade in นุ่มนวล

        oceanNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain);

        oceanNoise.start(now);
        lfo.start(now);
    }

    // ปุ่มเปิด-ปิดเสียง (Mute / Unmute)
    toggleSound() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
        }
        return this.isMuted;
    }
}

// Global Instance
const soundEngine = new EpicOceanAudioEngine();
