-- CreateTable
CREATE TABLE "SafeAccount" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "employerAddress" TEXT NOT NULL,
    "employeeAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SafeAccount_address_key" ON "SafeAccount"("address");
