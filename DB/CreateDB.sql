USE [HR_ReviewDB]
GO


ALTER TABLE [dbo].[PerformanceReview] DROP CONSTRAINT [FK_PerformanceReview_UserId]
GO

ALTER TABLE [dbo].[PerformanceReview] DROP CONSTRAINT [FK_PerformanceReview_ReviewerId]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 4/2/2021 6:16:02 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
DROP TABLE [dbo].[Users]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 4/2/2021 6:16:02 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[EmailAddress] [nvarchar](50) NULL,
	[DepartmentName] [nvarchar](50) NULL,
	[IsAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[PerformanceReview]    Script Date: 4/3/2021 1:02:04 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PerformanceReview]') AND type in (N'U'))
DROP TABLE [dbo].[PerformanceReview]
GO

/****** Object:  Table [dbo].[PerformanceReview]    Script Date: 4/3/2021 1:02:04 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PerformanceReview](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ReviewerId] [int] NOT NULL,
	[Performance] [nvarchar](50) NULL,
	[IsReviewed] [bit] NOT NULL,
	[AssignDate] [datetime] NULL,
	[ReviewDate] [datetime] NULL,
 CONSTRAINT [PK_PerformanceReview] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PerformanceReview]  WITH CHECK ADD  CONSTRAINT [FK_PerformanceReview_ReviewerId] FOREIGN KEY([ReviewerId])
REFERENCES [dbo].[Users] ([id])
GO

ALTER TABLE [dbo].[PerformanceReview] CHECK CONSTRAINT [FK_PerformanceReview_ReviewerId]
GO

ALTER TABLE [dbo].[PerformanceReview]  WITH CHECK ADD  CONSTRAINT [FK_PerformanceReview_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([id])
GO

ALTER TABLE [dbo].[PerformanceReview] CHECK CONSTRAINT [FK_PerformanceReview_UserId]
GO

/*************
Views
*************/
DROP VIEW [dbo].[vPerformance]
GO

/****** Object:  View [dbo].[vPerformance]    Script Date: 4/3/2021 8:24:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vPerformance]
AS
SELECT      p.id as id,
			p.ReviewerId as ReviewerId,
			u.UserName as [UserName],
			r.UserName as [ReviewerName],
			p.Performance as Performance,
			p.IsReviewed as Reviewed,
			p.AssignDate as AssignDate,
			p.ReviewDate as ReviewDate
FROM dbo.PerformanceReview p INNER JOIN
     dbo.Users u ON p.UserId = u.id 
     inner join dbo.Users r on
	 p.ReviewerId = r.id
GO



/***************
TEST DATA
***************/

USE [HR_ReviewDB]
GO


INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Alice' ,'a@mail.mail' ,'Human Resource', 1) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Bob' ,'b@mail.mail' ,'Software Dev', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Chris' ,'c@mail.mail' ,'Software Dev', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'David' ,'d@mail.mail' ,'Software Dev', 0) 

	INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Alice1' ,'a1@mail.mail' ,'Human Resource', 1) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Bob1' ,'b1@mail.mail' ,'Software Dev', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Chris1' ,'c1@mail.mail' ,'Software Dev', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'David1' ,'d1@mail.mail' ,'Software Dev', 0) 



INSERT INTO [dbo].[PerformanceReview] VALUES ( 1, 2, '', 0, GETDATE(), GETDATE())
INSERT INTO [dbo].[PerformanceReview] VALUES ( 3, 2, '', 0, GETDATE(), GETDATE())
INSERT INTO [dbo].[PerformanceReview] VALUES ( 4, 2, '', 0, GETDATE(), GETDATE())
INSERT INTO [dbo].[PerformanceReview] VALUES ( 5, 2, '', 0, GETDATE(), GETDATE())
INSERT INTO [dbo].[PerformanceReview] VALUES ( 6, 2, '', 0, GETDATE(), GETDATE())
INSERT INTO [dbo].[PerformanceReview] VALUES ( 3, 4, '', 0, GETDATE(), GETDATE())
GO