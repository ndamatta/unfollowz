"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

function DropSlot({ label, file, onDrop, onRemove }: {
  label: string;
  file: File | null;
  onDrop: (file: File) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("home.dropzone");
  const tActions = useTranslations("common.actions");
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/json": [".json"] },
    maxFiles: 1,
    onDropAccepted: (acceptedFiles) => {
      setError(null);
      onDrop(acceptedFiles[0]);
    },
    onDropRejected: () => setError(t("wrongFile")),
  });

  return (
    <div
      {...getRootProps({
        className: `flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200
          ${file ? "border-green-900 bg-green-900/10" : ""}
          ${isDragActive ? "border-rose-400 bg-rose-400/20 scale-[1.02]" : ""}
          ${error ? "border-red-500 bg-red-500/10" : ""}
          ${!file && !isDragActive && !error ? "border-slate-600 hover:border-rose-400 hover:bg-rose-400/5" : ""}
        `,
      })}
    >
      <input {...getInputProps()} />
      <p className="text-xs sm:text-sm text-slate-400 font-mono mb-4">
        {label}
      </p>

      {isDragActive ? (
        <p className="text-sm sm:text-base text-rose-400 font-medium">
          {t("dropHere")}
        </p>
      ) : file ? (
        <>
          <p className="text-sm sm:text-base text-slate-200 font-medium">
            {file.name}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setError(null);
              onRemove();
            }}
            className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors duration-200"
          >
            {tActions("remove")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm sm:text-base text-slate-300">
            {t("instruction")}{" "}
            <span className="text-rose-400 underline">{tActions("browse")}</span>
          </p>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </>
      )}
    </div>
  );
}

export interface DropZonePairRef {
  reset: () => void;
}

const DropZonePair = forwardRef<DropZonePairRef, {
  onBothReady: (followers: File, following: File) => void;
}>(({ onBothReady }, ref) => {
  const tActions = useTranslations("common.actions");
  const [followers, setFollowers] = useState<File | null>(null);
  const [following, setFollowing] = useState<File | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFollowers(null);
      setFollowing(null);
    },
  }));

  const bothReady = followers !== null && following !== null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <DropSlot
          label="followers.json"
          file={followers}
          onDrop={setFollowers}
          onRemove={() => setFollowers(null)}
        />
        <DropSlot
          label="following.json"
          file={following}
          onDrop={setFollowing}
          onRemove={() => setFollowing(null)}
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          disabled={!bothReady}
          onClick={() => {
            if (followers && following) onBothReady(followers, following);
          }}
          className={`px-8 py-3 rounded-2xl text-base sm:text-lg font-medium transition-all duration-200
            ${bothReady
              ? "bg-rose-400 text-slate-100 cursor-pointer hover:scale-105 hover:bg-rose-500 hover:text-zinc-950"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {tActions("process")}
        </button>
      </div>
    </div>
  );
});

DropZonePair.displayName = "DropZonePair";
export default DropZonePair;