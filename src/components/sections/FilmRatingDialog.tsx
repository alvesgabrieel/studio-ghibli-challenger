"use client";

import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/starRating";

interface FilmRatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filmId: string;
  initialRating?: number;
  initialNote?: string;
  onSave: (rating: number, note: string) => void;
}

export const FilmRatingDialog = ({
  open,
  onOpenChange,
  initialRating = 0,
  initialNote = "",
  onSave,
}: FilmRatingDialogProps) => {
  const [rating, setRating] = useState(initialRating);
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    setRating(initialRating);
    setNote(initialNote);
  }, [initialRating, initialNote, open]);

  const handleSave = () => {
    if (rating > 0 || note.trim()) {
      onSave(rating, note);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Classificar Filme</DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-4">
            <div className="flex gap-1">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                interactive
                size="lg"
              />
              <span className="text-sm text-gray-500">
                {rating > 0
                  ? `Você classificou com ${rating} estrela${rating !== 1 ? "s" : ""}`
                  : "Selecione uma avaliação"}
              </span>
            </div>

            <textarea
              className="min-h-[100px] w-full rounded border p-2"
              placeholder="Digite suas notas sobre o filme..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
            />
          </div>
        </DialogDescription>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={rating === 0 && !note.trim()}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
