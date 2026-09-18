let audioCtx, ambientGain, isSoundMuted = false;

// 6-Second Multi-Stage Cinematic Sound Design
function playLongEpicEntranceSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;

    // STAGE 1: Charging Hum & Cyber Beeps (0s - 2s)
    const chargeOsc = audioCtx.createOscillator();
    const chargeGain = audioCtx.createGain();
    chargeOsc.type = 'sawtooth';
    chargeOsc.frequency.setValueAtTime(60, now);
    chargeOsc.frequency.exponentialRampToValueAtTime(800, now + 2.2);

    chargeGain.gain.setValueAtTime(0.01, now);
    chargeGain.gain.linearRampToValueAtTime(0.3, now + 2.0);
    chargeGain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

    chargeOsc.connect(chargeGain);
    chargeGain.connect(audioCtx.destination);
    chargeOsc.start(now);
    chargeOsc.stop(now + 2.3);

    // Staccato Countdown Beeps
    [0.4, 0.9, 1.4, 1.8].forEach((timeOffset) => {
        const beepOsc = audioCtx.createOscillator();
        const beepGain = audioCtx.createGain();
        beepOsc.type = 'sine';
        beepOsc.frequency.setValueAtTime(880, now + timeOffset);
        beepGain.gain.setValueAtTime(0.15, now + timeOffset);
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.1);
        beepOsc.connect(beepGain);
        beepGain.connect(audioCtx.destination);
        beepOsc.start(now + timeOffset);
        beepOsc.stop(now + timeOffset + 0.1);
    });

    // STAGE 2: Black Hole Implosion Vacuum Drop (2.2s - 3.8s)
    const vacuumOsc = audioCtx.createOscillator();
    const vacuumGain = audioCtx.createGain();
    vacuumOsc.type = 'sine';
    vacuumOsc.frequency.setValueAtTime(900, now + 2.2);
    vacuumOsc.frequency.exponentialRampToValueAtTime(30, now + 3.8);

    vacuumGain.gain.setValueAtTime(0.01, now + 2.2);
    vacuumGain.gain.linearRampToValueAtTime(0.8, now + 3.6);
    vacuumGain.gain.exponentialRampToValueAtTime(0.001, now + 3.85);

    vacuumOsc.connect(vacuumGain);
    vacuumGain.connect(audioCtx.destination);
    vacuumOsc.start(now + 2.2);
    vacuumOsc.stop(now + 3.85);

    // STAGE 3: Supernova Boom Impact & Noise Whiteout (At 3.9s)
    setTimeout(() => {
        const impactNow = audioCtx.currentTime;

        // Sub-Bass Explosion Drop
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(320, impactNow);
        subOsc.frequency.exponentialRampToValueAtTime(16, impactNow + 4.0);

        subGain.gain.setValueAtTime(1.0, impactNow);
        subGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 4.2);

        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start(impactNow);
        subOsc.stop(impactNow + 4.2);

        // White Noise Blast Waves
        const bufferSize = audioCtx.sampleRate * 2.0;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(4500, impactNow);
        noiseFilter.frequency.exponentialRampToValueAtTime(80, impactNow + 2.0);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.8, impactNow);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 2.1);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(impactNow);

        // Orchestral Cyber Chord Blast Stack
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        notes.forEach((freq, idx) => {
            const chordOsc = audioCtx.createOscillator();
            const chordGain = audioCtx.createGain();

            chordOsc.type = 'sine';
            chordOsc.frequency.setValueAtTime(freq, impactNow + (idx * 0.03));

            chordGain.gain.setValueAtTime(0.01, impactNow + (idx * 0.03));
            chordGain.gain.linearRampToValueAtTime(0.22, impactNow + 0.05 + (idx * 0.03));
            chordGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 3.2 + (idx * 0.03));

            chordOsc.connect(chordGain);
            chordGain.connect(audioCtx.destination);
            chordOsc.start(impactNow + (idx * 0.03));
            chordOsc.stop(impactNow + 3.5);
        });

        initAmbientDrone(impactNow + 2.0);
    }, 3900);
}

function initAmbientDrone(startTime) {
    if (ambientGain) return;
    const ambOsc = audioCtx.createOscillator();
    const ambFilter = audioCtx.createBiquadFilter();
    ambientGain = audioCtx.createGain();

    ambOsc.type = 'sawtooth';
    ambOsc.frequency.setValueAtTime(55, startTime);
    ambFilter.type = 'lowpass';
    ambFilter.frequency.setValueAtTime(180, startTime);

    ambientGain.gain.setValueAtTime(0.001, startTime);
    ambientGain.gain.linearRampToValueAtTime(0.1, startTime + 2.5);

    ambOsc.connect(ambFilter);
    ambFilter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);
    ambOsc.start(startTime);
}

function playBubbleClickSound() {
    if (!audioCtx || isSoundMuted) return;
    const popOsc = audioCtx.createOscillator();
    const popGain = audioCtx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(500, audioCtx.currentTime);
    popOsc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
    popGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    popOsc.connect(popGain);
    popGain.connect(audioCtx.destination);
    popOsc.start();
    popOsc.stop(audioCtx.currentTime + 0.1);
}

document.getElementById('sound-toggle').addEventListener('click', () => {
    if (!ambientGain) return;
    isSoundMuted = !isSoundMuted;
    const soundIcon = document.getElementById('sound-icon');
    if (isSoundMuted) {
        ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        soundIcon.textContent = '🔇';
    } else {
        ambientGain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.3);
        soundIcon.textContent = '🔊';
    }
});
let audioCtx, ambientGain, isSoundMuted = false;

// ฟังก์ชันดึง/สร้าง AudioContext และกด Resume เมื่อมีปฏิกิริยากับหน้าเว็บ
function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// 6-Second Multi-Stage Cinematic Sound Design
function playLongEpicEntranceSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // STAGE 1: Charging Hum & Cyber Beeps (0s - 2s)
    const chargeOsc = ctx.createOscillator();
    const chargeGain = ctx.createGain();
    chargeOsc.type = 'sawtooth';
    chargeOsc.frequency.setValueAtTime(60, now);
    chargeOsc.frequency.exponentialRampToValueAtTime(800, now + 2.2);

    chargeGain.gain.setValueAtTime(0.01, now);
    chargeGain.gain.linearRampToValueAtTime(0.3, now + 2.0);
    chargeGain.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

    chargeOsc.connect(chargeGain);
    chargeGain.connect(ctx.destination);
    chargeOsc.start(now);
    chargeOsc.stop(now + 2.3);

    // Staccato Countdown Beeps
    [0.4, 0.9, 1.4, 1.8].forEach((timeOffset) => {
        const beepOsc = ctx.createOscillator();
        const beepGain = ctx.createGain();
        beepOsc.type = 'sine';
        beepOsc.frequency.setValueAtTime(880, now + timeOffset);
        beepGain.gain.setValueAtTime(0.15, now + timeOffset);
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.1);
        beepOsc.connect(beepGain);
        beepGain.connect(ctx.destination);
        beepOsc.start(now + timeOffset);
        beepOsc.stop(now + timeOffset + 0.1);
    });

    // STAGE 2: Black Hole Implosion Vacuum Drop (2.2s - 3.8s)
    const vacuumOsc = ctx.createOscillator();
    const vacuumGain = ctx.createGain();
    vacuumOsc.type = 'sine';
    vacuumOsc.frequency.setValueAtTime(900, now + 2.2);
    vacuumOsc.frequency.exponentialRampToValueAtTime(30, now + 3.8);

    vacuumGain.gain.setValueAtTime(0.01, now + 2.2);
    vacuumGain.gain.linearRampToValueAtTime(0.8, now + 3.6);
    vacuumGain.gain.exponentialRampToValueAtTime(0.001, now + 3.85);

    vacuumOsc.connect(vacuumGain);
    vacuumGain.connect(ctx.destination);
    vacuumOsc.start(now + 2.2);
    vacuumOsc.stop(now + 3.85);

    // STAGE 3: Supernova Boom Impact & Noise Whiteout (At 3.9s)
    setTimeout(() => {
        const impactNow = ctx.currentTime;

        // Sub-Bass Explosion Drop
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(320, impactNow);
        subOsc.frequency.exponentialRampToValueAtTime(16, impactNow + 4.0);

        subGain.gain.setValueAtTime(1.0, impactNow);
        subGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 4.2);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(impactNow);
        subOsc.stop(impactNow + 4.2);

        // White Noise Blast Waves
        const bufferSize = ctx.sampleRate * 2.0;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(4500, impactNow);
        noiseFilter.frequency.exponentialRampToValueAtTime(80, impactNow + 2.0);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, impactNow);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 2.1);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(impactNow);

        // Orchestral Cyber Chord Blast Stack
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        notes.forEach((freq, idx) => {
            const chordOsc = ctx.createOscillator();
            const chordGain = ctx.createGain();

            chordOsc.type = 'sine';
            chordOsc.frequency.setValueAtTime(freq, impactNow + (idx * 0.03));

            chordGain.gain.setValueAtTime(0.01, impactNow + (idx * 0.03));
            chordGain.gain.linearRampToValueAtTime(0.22, impactNow + 0.05 + (idx * 0.03));
            chordGain.gain.exponentialRampToValueAtTime(0.0001, impactNow + 3.2 + (idx * 0.03));

            chordOsc.connect(chordGain);
            chordGain.connect(ctx.destination);
            chordOsc.start(impactNow + (idx * 0.03));
            chordOsc.stop(impactNow + 3.5);
        });

        initAmbientDrone(impactNow + 2.0);
    }, 3900);
}

function initAmbientDrone(startTime) {
    if (ambientGain || !audioCtx) return;
    const ambOsc = audioCtx.createOscillator();
    const ambFilter = audioCtx.createBiquadFilter();
    ambientGain = audioCtx.createGain();

    ambOsc.type = 'sawtooth';
    ambOsc.frequency.setValueAtTime(55, startTime);
    ambFilter.type = 'lowpass';
    ambFilter.frequency.setValueAtTime(180, startTime);

    ambientGain.gain.setValueAtTime(0.001, startTime);
    ambientGain.gain.linearRampToValueAtTime(0.1, startTime + 2.5);

    ambOsc.connect(ambFilter);
    ambFilter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);
    ambOsc.start(startTime);
}

function playBubbleClickSound() {
    const ctx = getAudioContext();
    if (!ctx || isSoundMuted) return;
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(500, ctx.currentTime);
    popOsc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    popGain.gain.setValueAtTime(0.25, ctx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start();
    popOsc.stop(ctx.currentTime + 0.1);
}

// ผูก Event Listener ปลอดภัยด้วย DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            isSoundMuted = !isSoundMuted;
            const soundIcon = document.getElementById('sound-icon');
            if (ambientGain && audioCtx) {
                if (isSoundMuted) {
                    ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
                    if (soundIcon) soundIcon.textContent = '🔇';
                } else {
                    ambientGain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.3);
                    if (soundIcon) soundIcon.textContent = '🔊';
                }
            } else if (soundIcon) {
                soundIcon.textContent = isSoundMuted ? '🔇' : '🔊';
            }
        });
    }
});
