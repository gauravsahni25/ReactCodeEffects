﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeEffects.Rule.Attributes;
using CodeEffects.Rule.Common;
using ReactEffects.Api.Services;

namespace ReactEffects.Api.Models
{
    public class ClientSettings
    {
        public string EditorData { get; set; }
        public string SourceData { get; set; }

        public ClientSettings() { }
    }

	public class EvaluateRequest
	{
		public Patient Patient { get; set; }
		public string RuleData { get; set; }

		/*		public EvaluateRequest()
				{
				}
		*/
	}

	/*	public class PatientX
		{
			public string FirstName { get; set; }
			public string LastName { get; set; }
			public GenderX Gender { get; set; }
			public bool Alcohol { get; set; }
			public int Pulse { get; set; }

			public PatientX() { }
		}

		public enum GenderX
		{
			Male,
			Female,
			Undefined
		}*/

    public class EvaluateResponse : Result
    {
        public Patient Patient { get; set; }

        public EvaluateResponse() : base() { }
    }

    public enum Gender
    {
        Male,
        Female,
        [ExcludeFromEvaluation]
        Unknown
    }

	// External methods and actions
	[ExternalAction(typeof(PatientService), "RequestInfo")]
	public class Patient
	{
		// C-tor
		public Patient()
		{
			this.ID = Guid.Empty;
			this.Gender = Gender.Unknown;
			this.Alcohol = false;
		}

		// This property will not appear in the Rule Editor - Code Effects component ignores Guids
		// Details at http://codeeffects.com/Doc/Business-Rules-Data-Types
		public Guid ID { get; set; }

		[Field(DisplayName = "First Name", Description = "Patient's first name", ValueInputType = ValueInputType.User, Max = 30)]
		public string FirstName { get; set; }

		[Field(DisplayName = "Last Name", Max = 30, ValueInputType = ValueInputType.User, Description = "Patient's last name")]
		public string LastName { get; set; }

		[Field(ValueInputType = ValueInputType.User, Description = "Patient's gender")]
		public Gender Gender { get; set; }

		[Field(Min = 0, Max = 200, Description = "Current pulse")]
		public int? Pulse { get; set; }

		[Field(DisplayName = "Alcohol Box", Description = "Alcohol use?")]
		public bool Alcohol { get; set; }

		// This property is used to display the output of rule actions
		[ExcludeFromEvaluation]
		public string Output { get; set; }

		[Method("Full Name", "Joins together patient's first and last names")]
		public string FullName()
		{
			return string.Format("{0} {1}", this.FirstName, this.LastName);
		}

		// Empty overload of the Register method.
		[Action(Description = " Registers new patient")]
		public void Register()
		{
			this.Output += " The patient has been registered";
		}

		// This is the overload of the Register method that takes one param.
		// Both overloads can be used in Code Effects as two different actions
		// as long as their display names are different.
		[Action("Register with a Message", "Registers new patient with additional info")]
		public void Register([Parameter(ValueInputType.User, Description = "Output message")] string message)
		{
			this.Output += " " + message;
		}
	}

    public class Result
    {
        public bool IsRuleEmpty { get; set; }
        public bool IsRuleValid { get; set; }
        public string Output { get; set; }
        public string ClientInvalidData { get; set; }

        public Result()
        {
            IsRuleEmpty = false;
            IsRuleValid = true;
        }
    }

    public class Rule
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
