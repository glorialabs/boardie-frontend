import { useState, useEffect } from "react";
import dayjs from "dayjs";

const useCountdown = (targetDate: string | null) => {
    const [timeLeft, setTimeLeft] = useState<null | number>(null);

    useEffect(() => {
        if (targetDate) {
            const endDate = dayjs(targetDate);
            const now = dayjs();
            if (endDate.isAfter(now)) {
                const diff = endDate.diff(now);
                setTimeLeft(diff);
                const timer = setInterval(() => {
                    const newDiff = endDate.diff(dayjs());
                    if (newDiff <= 0) {
                        clearInterval(timer);
                        setTimeLeft(0);
                    } else {
                        setTimeLeft(newDiff);
                    }
                }, 1000);
                return () => clearInterval(timer);
            } else {
                setTimeLeft(0);
            }
        }
    }, [targetDate]);

    return timeLeft;
};

export default useCountdown;