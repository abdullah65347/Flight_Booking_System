package com.flight.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger =
            LoggerFactory.getLogger(LoggingAspect.class);

    @Around("execution(* com.flight.service.impl.*.*(..))")
    public Object logMethod(ProceedingJoinPoint joinPoint) throws Throwable {

        String methodName = joinPoint.getSignature().toShortString();

        logger.info("Method Started: {}", methodName);

        long startTime = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed();   // execute method

            long endTime = System.currentTimeMillis();

            logger.info("Method Completed: {}", methodName);
            logger.info("Execution Time: {} ms",
                    (endTime - startTime));

            return result;

        } catch (Exception ex) {

            logger.error("Exception in method: {}",
                    methodName);
            logger.error("Error message: {}",
                    ex.getMessage());

            throw ex; 
        }
    }
}