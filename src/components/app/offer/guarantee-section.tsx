"use client";
import { Trophy } from 'lucide-react';

export function GuaranteeSection() {
    return (
        <div className="border border-border rounded-lg p-8 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center">
                <div className="inline-block bg-primary/10 p-4 rounded-full">
                    <Trophy className="h-16 w-16 text-primary"/>
                </div>
            </div>
            <div className="md:col-span-2">
                <h3 className="text-fluid-h3 font-bold">Your 100% Satisfaction Promise</h3>
                <p className="mt-2 text-muted-foreground text-fluid-base">
                    You’re fully protected. If you’re not absolutely in love with your new website, we’ll revise it, polish it, and adjust it until you are. No risk. No stress. You either LOVE your website… or we work until you do.
                </p>
            </div>
        </div>
    );
}
