USE [HR_ReviewDB]
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


/****** Object:  Table [dbo].[PerformanceReview]    Script Date: 4/2/2021 6:15:53 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PerformanceReview]') AND type in (N'U'))
DROP TABLE [dbo].[PerformanceReview]
GO

/****** Object:  Table [dbo].[PerformanceReview]    Script Date: 4/2/2021 6:15:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PerformanceReview](
	[id] [int] NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Reviewer] [nvarchar](50) NOT NULL,
	[Performance] [nvarchar](50) NOT NULL,
	[IsReviewed] [bit] NOT NULL,
	[AssignedDate] [datetime] NULL,
	[ReviewedDate] [datetime] NULL,
 CONSTRAINT [PK_PerformanceReview] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [HR_ReviewDB]
GO

truncate table Users
go

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Alice' ,'a@mail.mail' ,'HR', 1) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Bob' ,'b@mail.mail' ,'SD', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'Chris' ,'c@mail.mail' ,'SD', 0) 

INSERT INTO [dbo].[Users] ([UserName] ,[EmailAddress] ,[DepartmentName] ,[IsAdmin])
     VALUES ( 'David' ,'d@mail.mail' ,'SD', 0) 