-- DropIndex
DROP INDEX "Like_userId_postId_key";

-- CreateIndex
CREATE INDEX "UserLikesPost_userId_postId_idx" ON "Like"("userId", "postId");
